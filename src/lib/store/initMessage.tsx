"use client";
import React, { useEffect, useRef } from "react";
import { useMessage } from "./message";
import { useUser } from "./user";

export default function InitMessages({ messages }: { messages: MessageType[] }) {
	const initState = useRef(false);
	const {user} = useUser()
	
	useEffect(() => {
		if (!initState.current) {
			useMessage.getState().setMessages(messages, user?.id as string);
		}
		initState.current = true;
		// eslint-disable-next-line
	}, []);

	return <></>;
}