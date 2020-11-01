export function get_users() {
    return fetch(`http://52.77.203.212/api-react/index.php?action=get_users`,)
        .then((response) => response.json());
}

export function post_user(data) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ data })
    // };
    return fetch('http://52.77.203.212/api-react/index.php?action=post_user&username='+data['username'])
        .then(response => response.json());
}
