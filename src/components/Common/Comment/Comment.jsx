import React from 'react';

function Comment(props) {
    return (
        <div>
            <form>
                <textarea
                    placeholder="write your opinion..."
                />
                <button type="submit">작성</button>
            </form>
            {/* 이전에 등록된 댓글들 보여주게 */}
            <div>
                <div>
                    <p>댓글 1</p>
                    <small>2 시간 전</small>
                </div>
            </div>
        </div>
    )
}

export default Comment;