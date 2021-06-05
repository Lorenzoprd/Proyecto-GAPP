import { useSelector } from 'react-redux';
import './Article.css';
import { Link } from 'react-router-dom';
import FindUsers from './FindUsers';

export default function Article() {
    const user = useSelector((s) => s.user);
    console.log(user.foto);

    const foto = user.foto
        ? require(`../../Back/static/` + user.foto).default
        : 'https://static.vecteezy.com/system/resources/thumbnails/000/379/559/small/Universal__2838_29.jpg';
    console.log('Article:', foto);
    return (
        <div className="article">
            <Link to={'/profile/' + user.id}>
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${foto})`,
                    }}
                />
            </Link>

            <p className="username">{user.name}</p>

            <FindUsers />
        </div>
    );
}
