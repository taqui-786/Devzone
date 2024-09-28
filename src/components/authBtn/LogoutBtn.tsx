import React from "react";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth";

function LogoutBtn() {
    async function logoutuser() {
      'use server'
    await signOut({redirectTo:'/'});
  }
  return (
    <form action={logoutuser}>
      <Button type="submit">Logout</Button>
    </form>
  );
}

export default LogoutBtn;
