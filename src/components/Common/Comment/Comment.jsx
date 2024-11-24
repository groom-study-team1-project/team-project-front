import React from 'react';

function Comment(postId) {

    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState("");

    React.useEffect(() => {
        fetchComment(postId).then(response =>
            setComments(response.data)
        );
    }, []);

    const fetchComment = async (postId) => {
        const response = await fetch("/comments/" + postId);
        const data = await response.json();
        setComments(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = {
            id : Date.now(),
            text : newComment,
            date : new Date()
        };

        setComments([...comments, comment]);
        setNewComment("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="write your opinion..."
                />
                <button type="submit">작성</button>
            </form>

            <div className="previousComments">
                {comments.map((comment) => (
                    <div>
                        <p>{comment.text}</p>
                        <small>{comment.date.toString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comment;