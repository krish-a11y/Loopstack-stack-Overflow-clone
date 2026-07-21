import { create } from "zustand"; //for creating  the zustand state store
import { immer } from "zustand/middleware/immer"; //for making the use of mutate state available
import { persist } from "zustand/middleware"; //for storing the store in the local storge

import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";

//interface defination (helps for creating zustand store)


// setting the preferences (cumstome data)
export interface UserPrefs {
  reputation: number;
}

// setting the inteface of the store 
interface IAuthStore {

  // states
  sessions: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;

  // methods
  setHydrated(): void;
  verifySession(): Promise<void>;
  login(
    email: string,
    password: string,
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  createAccount(
    email: string,
    password: string,
    name: string,
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  logout(): Promise<void>;
}

// creating the store
export const useAuthStore = create<IAuthStore>()(

  // using the persist which stores the store in the localstoroage
  persist(
    // using immer which  helps to set the states and define the function
    immer((set) => ({

      // initially seting everything to null
      sessions: null,
      jwt: null,
      user: null,
      hydrated: false,

      // onRehydrateStorage function wil run first (which will copy all the states from the localstorage)
      setHydrated() {
        // as all the data is copied from the localstorage hence set the  hydrate to true
        set({ hydrated: true });
      },

      // verify session 
      async verifySession() {
        try {
          // check if the user session exists or not
          const currentSession = await account.getSession("current");
          set({ sessions: currentSession });
        } catch (error) {
          console.log(error);
        }
      },

      // user login function
      async login(email:string, password:string) {
        try {
          // creating a currernt session  of the user
          const session = await account.createEmailPasswordSession(
            email,
            password,
          );
          // seeting the user and the jwt of the user
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT(),
          ]);
          // setting the repuation of the user to 0 if the int dont exist
          if (!user.prefs?.reputation)
            await account.updatePrefs<UserPrefs>({
              reputation: 0,
            });

            // updating the states
          set({ sessions:session, user, jwt });
          return {
            success: true,
          };
        } catch (error) {
          console.log(error);

          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      // creating  the user
      async createAccount(email:string, password:string, name:string) {
        try {
          // creating the account with ID (unique)
          await account.create(ID.unique(),email,password,name)
          return {
            success:true
          }
        } catch (error) {
          console.log(error);

          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },
      // logout the user
      async logout() {
        try {
          // delete all the sessions of the user
          await account.deleteSessions()
          // setting the states to null as  the user is logout
          set({sessions:null,jwt:null,user:null})
        } catch (error) {
          
        }
      },
    })),
    // copies the data from the localstorage
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    },
  ),
);
