import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function VoteThis({
    url_post,
    url_user,
    url_get,
    id_a_votar,
    clase,
    id_target_user,
}) {
    const [votesByUser, setVotesByUser] = useState(0);
    const [totalVotes, setTotalVotes] = useState('0');
    const user = useSelector((u) => u.user);
    const history = useHistory();
    // const dispatch = useDispatch();
    fetch(url_user + id_a_votar, {
        headers: {
            Authorization: 'Bearer ' + user.token,
        },
    })
        .then((res) => res.json())
        .then((data) => setVotesByUser(data.votos));

    fetch(url_get + id_a_votar, {
        headers: {
            Authorization: 'Bearer ' + user.token,
        },
    })
        .then((res) => res.json())
        .then((data) => setTotalVotes(data.votos.toString()));

    async function HandleClick(e) {
        e.preventDefault();
        const res = await fetch(url_post + id_a_votar, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + user.token,
            },
        });

        if (res.ok) {
            history.push('/tab');
            history.goBack();
        }
    }

    return (
        <div //tenemos esta logica de clases para cambiar el tamaño de los botones y votos dependiendo de si es una pregunta, respuesta, cometnario
            className={
                clase === 'question'
                    ? 'vote-this-question'
                    : clase === 'answer'
                    ? 'vote-this-answer'
                    : 'vote-this-comment'
            }
        >
            {!votesByUser &&
                user.info.id !== id_target_user && ( //Si no has votado aun la pregunta y no eres el que hizo la pregunta/respuesta/comentario, puedes votar, se muestra el pulgar.
                    <button
                        className={
                            clase === 'question'
                                ? 'like-button-question'
                                : clase === 'answer'
                                ? 'like-button-answer'
                                : 'like-button-comment'
                        }
                        style={{
                            backgroundImage: `url(https://static.thenounproject.com/png/11666-200.png)`,
                        }}
                        onClick={(e) => HandleClick(e)}
                        title="Vota esta Pregunta"
                    />
                )}

            {totalVotes !== '0' ? ( //Aqui el div que muestra votos: x cantidad con el fondo dorado.
                <div
                    className={
                        clase === 'question'
                            ? 'votes-question'
                            : clase === 'answer'
                            ? 'votes-answer'
                            : 'votes-comment'
                    }
                    title="Total de votos"
                >
                    <p>Votos: </p>
                    <div
                        className={
                            clase === 'question'
                                ? 'total-votes-question'
                                : clase === 'answer'
                                ? 'total-votes-answer'
                                : 'total-votes-comment'
                        }
                    >
                        {totalVotes}
                    </div>
                </div>
            ) : (
                <div
                    className={
                        clase === 'question'
                            ? 'votes-question'
                            : clase === 'answer'
                            ? 'votes-answer'
                            : 'votes-comment'
                    }
                    title="Total de votos"
                >
                    <p>Votos: </p>
                    <div
                        className={
                            clase === 'question'
                                ? 'total-votes-question'
                                : clase === 'answer'
                                ? 'total-votes-answer'
                                : 'total-votes-comment'
                        }
                    >
                        0
                    </div>
                </div>
            )}
            <div />
        </div>
    );
}