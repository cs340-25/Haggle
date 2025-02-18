import { sqlConnect } from "@/app/server/connection";
import { ILobby, Lobby } from "@/app/server/models/lobby";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { lobbyCode: string } }) {
    /*
    Returns:
    - [...lobbies] if success
    - [] if failure
    Status:
    - 200 if success
    - 400 if bad request
    - 500 if server error
    */

    console.log(`lobbies/${params.lobbyCode} got a GET request!`);

    await sqlConnect.authenticate();
    await Lobby.sync();

    try {
        const result = await Lobby.findOne({where: {
            code: params.lobbyCode
        }});
        
        if (result != undefined) {
            return new NextResponse(JSON.stringify(result), {
                status: 200
            });
        } else {
            return new NextResponse(JSON.stringify("Error: lobby does not exist."), {
                status: 404
            });
        }

    } catch (err) {
        return new NextResponse(JSON.stringify([]), {
            status: 500
        });
    }
}


export async function PUT(req: NextRequest, { params }: { params: { lobbyCode: string } }) {
    /*
    Returns:
    - newLobby if success
    - errorStr if failure
    Status:
    - 200 if success
    - 500 if server error
    */

    console.log(`lobbies/${params.lobbyCode} got a PUT request!`);

    await sqlConnect.authenticate();
    await Lobby.sync();

    const newLobby: ILobby = await req.json();

    // get old lobby
    let oldLobby = await Lobby.findOne({
        where: {
            code: params.lobbyCode
        }
    });

    if (oldLobby == undefined) {
        return new NextResponse(JSON.stringify("Error: failed to GET existing lobby."), {
            status: 404
        });
    }
    
    // update lobby
    if (newLobby.numPlayers != -1) {
        oldLobby.set({
            numPlayers: newLobby.numPlayers
        });
    } else if (newLobby.state != "") {
        oldLobby.set({
            state: newLobby.state
        });
    } else {
        return new NextResponse(JSON.stringify("Error: invalid lobby object."), {
            status: 400
        });
    }
    oldLobby.save();

    return new NextResponse(JSON.stringify(`Successfully updated lobby ${params.lobbyCode}!`), {
        status: 200
    });
}


export async function DELETE(req: NextRequest, { params }: { params: { lobbyCode: string } }) {
    /*
    Returns:
    - [...lobbies] if success
    - [] if failure
    Status:
    - 200 if success
    - 400 if bad request
    - 500 if server error
    */

    console.log(`lobbies/${params.lobbyCode} got a DELETE request!`);

    await sqlConnect.authenticate();
    await Lobby.sync();

    try {
        const result = await Lobby.destroy({where: {
            code: params.lobbyCode
        }});

        return new NextResponse(JSON.stringify(result), {
            status: 200
        });

    } catch (err) {
        return new NextResponse(JSON.stringify("Error: failed to delete lobby."), {
            status: 500
        });
    }
}