import React, { useState } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';
import { CommentData } from '../types/Comment';

type Props = {
  post: Post;
  addComment: (v: CommentData & { postId: number }) => Promise<void>;
};

export const NewCommentForm: React.FC<Props> = ({ post, addComment }) => {
  const [name, setName] = useState('');
  const [hasNameError, setHasNameError] = useState(false);

  const [email, setEmail] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const [body, setBody] = useState('');
  const [hasBodyError, setHasBodyError] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setHasNameError(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setHasEmailError(false);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setHasBodyError(false);
  };

  const reset = () => {
    setName('');
    setHasNameError(false);

    setEmail('');
    setHasEmailError(false);

    setBody('');
    setHasBodyError(false);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSending(true);

    const nameError = !name.trim();
    const emailError = !email.trim();
    const bodyError = !body.trim();

    setHasNameError(nameError);
    setHasEmailError(emailError);
    setHasBodyError(bodyError);

    if (nameError || emailError || bodyError) {
      setIsSending(false);

      return;
    }

    const newComment = {
      name,
      body,
      email,
      postId: post.id,
    };

    addComment(newComment).finally(() => setIsSending(false));
    reset();
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={submit} onReset={reset}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div
          className={cn('control has-icons-left', {
            'has-icons-right': hasNameError,
          })}
        >
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={cn('input', {
              'is-danger': hasNameError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {hasNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasNameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div
          className={cn('control has-icons-left', {
            'has-icons-right': hasEmailError,
          })}
        >
          <input
            value={email}
            onChange={handleEmailChange}
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={cn('input', {
              'is-danger': hasEmailError,
            })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {hasEmailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={body}
            onChange={handleBodyChange}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={cn('textarea', {
              'is-danger': hasBodyError,
            })}
          />
        </div>

        {hasBodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={cn('button is-link', {
              'is-loading': isSending,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
