import { useQuery } from "@tanstack/react-query";

export function useFetchPlayerById(id: string) {
    return useQuery({
        queryFn: async () => await fetch(`https://users.roblox.com/v1/${id}`).then(res => res.json()),
        queryKey: ["userId", id]
    })
}