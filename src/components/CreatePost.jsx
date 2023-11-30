import { Post } from '@/models/Post';
import { db } from '@/scripts/firebase';
import { push, ref } from 'firebase/database';
import React, { useState } from 'react';

export default function CreatePost({ className }) {
	let [post, setPost] = useState(new Post());

	function createPost() {
		push(ref(db, '/posts'), post);
		setPost(new Post());
	}

	return (
		<div className={`bg-light text-dark p-3 rounded ${className}`}>
			<div className="d-flex justify-content-between align-items-center mb-2">
				<h4>Создать публикацию</h4>
				<button className="btn btn-dark text-light" onClick={createPost}>
					Создать
				</button>
			</div>
			<div className="d-flex flex-column gap-2">
				<input className="form-control" placeholder="Заголовок" value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} />
				<textarea className="form-control" placeholder="Описание" value={post.description} onChange={e => setPost({ ...post, description: e.target.value })}></textarea>
				<input className="form-control" placeholder="url фотографии" value={post.cover} onChange={e => setPost({ ...post, cover: e.target.value })} />
				{post.cover.trim() != '' && <div className=" rounded" style={{ height: '15em', background: `url(${post.cover}) center`, backgroundSize: 'cover' }}></div>}
			</div>
		</div>
	);
}
