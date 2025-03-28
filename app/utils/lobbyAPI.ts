import { ILobby } from "../server/models/lobby";


export async function getPublicLobbies(): Promise<ILobby[] | undefined> {
    try {
        const initRes = await fetch("/api/lobbies?" + new URLSearchParams({
            private: "false"
        }), {
            method: "GET",
            cache: "no-cache"
        });
    
        return await initRes.json();
    } catch {
        return undefined;
    }
}


export async function getAllLobbies(): Promise<ILobby[] | undefined> {
    try {
        const initRes = await fetch("/api/lobbies?" + new URLSearchParams({
            private: "true"
        }), {
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


export async function genLobbyCode(): Promise<string> {
    // gets a UNIQUE lobby code

    let code = '';
    const lobbies = await getAllLobbies();
    if (!lobbies) {
        throw new Error("Failed to get lobbies for generating unique lobby code.");
    }

    while (lobbies.find(lobby => (lobby.code == code || code == ''))) {
        code = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        for (let i = 0; i < 6; ++i) {
            code += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    }

    return code;
}