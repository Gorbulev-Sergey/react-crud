'use client';

import { db } from '@/scripts/firebase';
import { onValue, ref, remove } from 'firebase/database';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CreatePost from '@/components/CreatePost';
import { Post } from '@/models/Post';

function removePost(uid: string) {
	remove(ref(db, `/posts/${uid}`));
}

export default function Home() {
	let [posts, setPosts] = useState([] as [string, Post][]);

	useEffect(() => {
		onValue(ref(db, '/posts'), s => {
			if (s.exists()) setPosts(Object.entries(s.val()) as [string, Post][]);
		});
	}, []);

	return (
		<>
			<div className="container my-4">
				<CreatePost className="mb-3" />

				<div className="bg-light text-dark p-3 rounded mb-3">
					<h4>Список публикаций</h4>
					<div className="d-flex flex-column gap-2">
						{posts.map(([key, post], i) => {
							return (
								<div key={key} className="d-flex justify-content-between align-items-center">
									<div>
										{i + 1}. {post.title}
									</div>
									<button
										className="btn btn-sm btn-dark text-light"
										onClick={() => {
											removePost(key);
										}}>
										Удалить
									</button>
								</div>
							);
						})}
					</div>
				</div>

				<div className="row row-cols-1 row-cols-md-3 g-4">
					{posts.map(([key, post], i) => {
						return (
							<div key={key} className="col">
								<div className="d-flex flex-column bg-light text-dark rounded h-100">
									<div className="p-3 flex-grow-1">
										<div className="d-flex justify-content-between align-items-center">
											<h5>{post.title}</h5>
											<button
												className="btn btn-sm btn-dark text-light"
												onClick={() => {
													removePost(key);
												}}>
												Удалить
											</button>
										</div>
										<div>{post.description}</div>
									</div>

									<div className="rounded-bottom" style={{ height: '10em', background: `url(${post.cover}) center`, backgroundSize: 'cover' }}></div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
