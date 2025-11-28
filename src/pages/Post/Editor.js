import React, { useState, useEffect, useReducer } from 'react';
import Editor, { Reducer, actions } from '../../components/Editor.js';
import Main from './Editor/Main.js';

// For demo version only!!!
const objectSetValue = (data, name, value) => {
    const keys = name.split('.');
    const dataNew = { ...data };
    let current = dataNew;
    const parents = [];

    keys.forEach((key, index) => {
        const isLast = index === keys.length - 1;

        if (isLast) {
            if (typeof value === 'undefined') {
                delete current[key];
            } else {
                current[key] = value;
            }
            return;
        }

        const next = current[key] && typeof current[key] === 'object'
            ? Array.isArray(current[key])
                ? [ ...current[key] ]
                : { ...current[key] }
            : {};

        current[key] = next;
        parents.push({ parent: current, key });
        current = next;
    });

    if (typeof value === 'undefined') {
        for (let index = parents.length - 1; index >= 0; index--) {
            const { parent, key } = parents[index];
            const branch = parent[key];

            if (branch && typeof branch === 'object' && !Array.isArray(branch)
                && Object.keys(branch).length === 0) {
                delete parent[key];
            } else if (Array.isArray(branch) && branch.length === 0) {
                delete parent[key];
            } else {
                break;
            }
        }
    }

    return dataNew;
};

const PageEditor = () => {

    const [post, setPost] = useState({
        title: '', description: ''
    });
    const [state, dispatch] = useReducer(Reducer);

    const handleChange = (name, value) => {
        console.log(name, value);
        const postNew = objectSetValue(post, name, value);
        console.log(postNew);
        setPost(postNew);
    };

    // For demo version only!!!
    const handleDownload = () => {
        let postNew = { ...post };
        if (state?.length > 0) {
            postNew.blocks = state;
        } else {
            delete postNew.blocks;
        }
        console.log('post.download', postNew);
        const json = JSON.stringify(postNew, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a'); // Створення елемента посилання
        link.download = 'post.json';
        link.href = url;
        link.click(); // Автоматичне кліання для завантаження
        URL.revokeObjectURL(url); // Очистка URL після завантаження
    };

    const handleDelete = async () => {
        console.log('post.delete');
        // ...
    };

    useEffect(() => {
        (async () => {
            const response = await fetch('post.json');
            console.log(response);
            if (response.status !== 200) {
                throw Error(response.statusText);
            }
            const postNew = await response.json();
            console.log('post.get', postNew);
            dispatch(
                actions.load(postNew.blocks ?? [])
            );
            setPost(postNew);
        })();
    }, []);

    return <div>
        <article itemScope="itemscope" itemType="https://schema.org/Article">
            <Main title={post.title} image={post.image} onChange={handleChange} />
            <Editor blocks={{ state, dispatch, actions }} intro={post.description}
                onChangeIntro={intro => handleChange('description', intro)} />
        </article>
        <p className="text-center mt-5">
            <a className="btn btn-primary me-2" onClick={handleDownload}
                title="Зберегти публікацію" href="#">Зберегти</a>
            <a className="btn btn-danger" onClick={handleDelete}
                title="Видалити публікацію" href="#">Видалити</a>
        </p>
    </div>;
};

export default PageEditor;
