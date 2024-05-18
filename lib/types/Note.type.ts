import { CardBodyType } from "@/components/Card";
import { ReactNode } from "react";

export type Note = {
  id?: number;
  isPrimary?: boolean;
  title?: string;
  bodyType?: CardBodyType;
  body?: ReactNode;
  bodyText?: string;
  date?: string;
  isPinned?: boolean;

  updated_at?: string;
  inserted_at?: string;

  local_id?: string | null;
  local_inserted_at?: Date | string;
  local_updated_at?: Date | string;
};
