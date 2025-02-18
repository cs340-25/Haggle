import { sqlConnect } from "@/app/server/connection";
import { ILobby, Lobby } from "@/app/server/models/lobby";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
	/*
	Returns:
	- [...lobbies] if success
	- [] if failure
	Status:
	- 200 if success
	- 400 if bad request
	- 500 if server error
	*/

	console.log("lobbies got a GET request!");

    await sqlConnect.authenticate();
    await Lobby.sync();

	try {
		const result = await Lobby.findAll({where: {
            private: false
        }});
		return new NextResponse(JSON.stringify(result), {
			status: 200
		});

	} catch (err) {
		return new NextResponse(JSON.stringify([]), {
			status: 500
		});
	}
}


export async function POST(req: NextRequest) {
	/*
	Returns:
	- newLobby if success
	- errorStr if failure
	Status:
	- 200 if success
	- 500 if server error
	*/

	console.log("lobbies got a POST request!");

    await sqlConnect.authenticate();
    await Lobby.sync();

    const newLobby: ILobby = await req.json();

	try {
		const result = await Lobby.create({
            code: newLobby.code,
            numPlayers: newLobby.numPlayers,
            private: newLobby.private,
            state: newLobby.state
        });
		return new NextResponse(JSON.stringify(result), {
			status: 200
		});

	} catch (err) {
		return new NextResponse(JSON.stringify("Error: failed to add new lobby."), {
			status: 500
		});
	}
}