export function get_users() {
    return fetch(`http://52.77.203.212/api-react/index.php?action=get_users`,)
        .then((response) => {response.json(); console.log(response)});
}

export function post_user(data) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ data })
    // };
    return fetch('http://52.77.203.212/api-react/index.php?action=post_user&username='+data['username']
        +'&password='+data.password
        +'&email='+data.email
        +'&first_name='+data.first_name
        +'&last_name='+data.last_name)
        .then(response => response.json());
}

export function login(data){
    return fetch('http://52.77.203.212/api-react/index.php?action=login' +
        '&username='+data.username
        +'&password='+data.password)
        .then(response => response.json());
}

export function getBoardDetail(boardId){
    return fetch('http://52.77.203.212/api-react/index.php?action=get_boarddetail' +
        '&id='+boardId)
        .then(response => response.json());
}

