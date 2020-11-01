export function get_users() {
    return fetch(`http://52.77.203.212/api-react/index.php?action=get_users`,)
        .then((response) => response.json());
}
