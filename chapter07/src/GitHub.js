import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Media, Form, Button } from 'react-bootstrap';

function GitHub() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('Sharor');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(res => {
                // console.log(res.data.items);
                setData(res.data.items);
                console.log(data);
                setIsLoading(false);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        getData();
    };

    const listUsers = data.map((user) =>
        <Media key={user.id}>
            <a href={user.html_url}>
                <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src={user.avatar_url}
                    alt="Generic placeholder"
                />
            </a>
            <Media.Body>
                <h5>Login: {user.login}</h5>
                <p>Id: {user.id}</p>
            </Media.Body>
        </Media>
    );

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formInlineName">
                    <Form.Control
                        type="text"
                        value={searchTerm}
                        placeholder="Enter Search Term"
                        onChange={event => setSearchTerm(event.target.value)}
                    />
                </Form.Group>
                {' '}
                <Button type="submit">
                    Search
                </Button>
            </Form>
            <h3>GitHub Users Results</h3>
            {isLoading &&
                <ReactLoading type="spinningBubbles" color="#444" />
            }
            {listUsers}
        </div>
    );
}

export default GitHub;