import { DataTypes } from 'sequelize';
import { sqlConnect } from '../connection';

export interface ILobby {
    code: string,
    numPlayers: number,
    private: boolean,
    state: string
};

export const Lobby = sqlConnect.define(
    'Lobby',
    {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        numPlayers: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        private: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        state: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    }
);