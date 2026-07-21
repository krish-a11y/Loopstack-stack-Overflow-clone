"use client"

import { databases } from "@/models/client/config"
import { db,voteCollection } from "@/models/name"
import { useAuthStore } from "@/store/Auth"
import { cn } from "@/lib/utils"
import { IconCaretUpFilled, IconCaretDownFilled } from "@tabler/icons-react";
import { ID, Models, Query } from "appwrite";
import { useRouter } from "next/navigation";
import React from "react";
