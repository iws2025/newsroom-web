import React, { useState } from 'react'
import { createComment } from '../../services/commentService';
import { toast } from 'react-toastify';

const CommentForm = ({ newsId, refetch }) => {
	const [content, setContent] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
            const result = await createComment({
				newsId,
				content
			});
            if (result) {
                toast.success(result.message);
				refetch();
            }
        } catch (error) {   
            console.log(error);
        }
	}

  	return (
		<div className="bg-light p-4">
			<h6 className="mb-3">Leave a comment</h6>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<textarea id="message" className="form-control" placeholder="Aa.." rows="5" onChange={(e) => setContent(e.target.value)}></textarea>
				</div>
				<div className="form-group mb-0">
					<button className="btn btn-primary font-weight-semi-bold py-2 px-3" onClick={onSubmit}>
						Submit
					</button>
				</div>
			</form>
		</div>
  	)
}

export default CommentForm