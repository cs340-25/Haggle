import { ILobby } from "../server/models/lobby";


export async function getPublicLobbies(): Promise<ILobby[] | undefined> {
    try {
        const initRes = await fetch("/api/lobbies", {
            method: "GET",
            cache: "no-cache"
        });
    
        return await initRes.json();
    } catch {
        return undefined;
    }
}


export async function getLobbyByID(code: string): Promise<ILobby | undefined> {
    const getRes = await fetch(`/api/lobbies/${code}`, {
        method: "GET",
    });

    if (getRes.status == 200) {
        return await getRes.json();
    } else {
        return undefined;
    }
}


export async function addLobby(newLobby: ILobby): Promise<void> {
    let postRes = await fetch("/api/lobbies", {
        method: "POST",
        body: JSON.stringify(newLobby)
    });
}


export async function updateLobby(newLobby: ILobby): Promise<void> {
    const postRes = await fetch(`/api/lobbies/${newLobby.code}`, {
        method: "PUT",
        body: JSON.stringify(newLobby)
    });
}


export async function rmLobby(code: string): Promise<void> {
    const getRes = await fetch(`/api/lobbies/${code}`, {
        method: "DELETE",
    });
}