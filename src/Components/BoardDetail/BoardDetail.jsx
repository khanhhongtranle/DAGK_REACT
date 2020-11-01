import Board from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import React, {useEffect, useState} from "react";
import {getBoards} from "components/Boards/Boards";

export function BoardDetail() {

    const [board, setBoard] = useState({
        columns: [
            {
                id: 1,
                title: 'Went Well',
                cards: [
                    {

                    },
                ]
            },
            {
                id: 2,
                title: 'To Improve',
                cards: [
                    {

                    },
                ]
            },
            {
                id: 3,
                title: 'Action Items',
                cards: [
                    {

                    },
                ]
            }
        ]
    });

    useEffect( () => {
        let mounted = true;
        getBoards()
            .then(details => {
                if (mounted){
                    //let board_detail = board;
                    console.log(details);
                }
            })
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <Board initialBoard={board} />
    )

}
