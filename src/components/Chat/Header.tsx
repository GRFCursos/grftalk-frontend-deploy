"use client";

import { useChatStore } from "@/stores/chatStore"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import dayjs from "dayjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { deleteChat } from "@/lib/requests";

export const Header = () => {
    const { chat, chats, setLoading } = useChatStore()

    const userIsOnline = dayjs().subtract(5, 'minutes').isBefore(dayjs(chats?.find(item => item.id === chat?.id)?.user.last_access))


    const handleDeleteChat = async () => {
        if (!chat) return;

        setLoading(true)
        await deleteChat(chat.id)
        setLoading(false)
    }

    return (
        <div className="flex items-center gap-6 border-b bg-slate-100/80 dark:bg-slate-900/80 px-8 pr-12 h-16">
            <Avatar className="size-11" isOnline={userIsOnline}>
                <AvatarImage
                    src={chat?.user.avatar}
                    alt={chat?.user.name}
                />
                <AvatarFallback>{chat?.user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 cursor-pointer">
                <h1 className="font-bold text-ellipsis truncate max-w-96">{chat?.user.name}</h1>
                <small className="text-slate-500 dark:text-slate-400 block mt-0.5">
                    {userIsOnline ? 'Online' : 'Última visualização ' + dayjs(chats?.find(item => item.id === chat?.id)?.user.last_access).format('DD/MM/YYYY [às] HH:mm')}
                </small>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVertical
                        className="size-5 text-slate-500 dakr:text-slate-400 hover:text-primary cursor-pointer"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer" onClick={handleDeleteChat}>
                        <Trash2 className="mr-2 size-4" />
                        <span>Excluir conversa</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}