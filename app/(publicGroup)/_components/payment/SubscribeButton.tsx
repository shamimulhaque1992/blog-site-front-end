"use client";

import { useActionState, useEffect } from "react";
import { subscribePremium } from "../../_actions/subscribePremium";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const SubscribeButton = () => {
  const [state, action, pending] = useActionState(subscribePremium, null);

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      toast.error(state.message || "failed to start checkout");
    }
  }, [state]);

  return (
    <form action={action}>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Redirection" : "Subscribe Now"}
      </Button>
    </form>
  );
};


