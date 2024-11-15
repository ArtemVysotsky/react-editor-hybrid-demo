import React, { useState, useEffect, useReducer } from 'react'
import Editor, { Reducer, actions} from '../../components/Editor.js'
import Main from './Editor/Main.js'

// For demo version only!!!
const objectSetValue = (data, name, value) => {
    const keys = name.split('.')
    const dataNew = { ...data }
    let current = dataNew
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value
      } else {
        current[key] = current[key] || {}
        current = current[key]
      }
    })
    return dataNew
}

export default () => {

    const [post, setPost] = useState({
        title: '', description: ''
    })
    const [state, dispatch] = useReducer(Reducer)

    const handleChange = (name, value) => {
        console.log(name, value)
        let postNew
        if (typeof value !== undefined) {
            postNew = objectSetValue(post, name, value )
        } else {
            let { [name]: value, ...postNew } = post
        }
        console.log(postNew)
        setPost(postNew)
    }

    // For demo version only!!!
    const handleDownload = event => {
        let postNew = { ...post }
        if (state?.length > 0) {
            postNew.blocks = state
        } else {
            delete postNew.blocks
        }
        console.log('post.download', postNew)
        const json = JSON.stringify(postNew, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        event.target.setAttribute('download', 'post.json')
        event.target.href = url
    }

    /*
    const handleSubmit = async () => {
        let postNew = { ...post }
        if (state?.length > 0) {
            postNew.blocks = state
        } else {
            delete postNew.blocks
        }
        setPost(postNew)
        console.log('post.submit', postNew)
        // ...
    }
    */

    const handleDelete = async () => {
        console.log('post.delete')
        // ...
    }

    // For demo version only!!!
    useEffect(() => {
        (async () => {
            const response = await fetch('post.json')
            console.log(response)
            if (response.status !== 200) {
                throw Error(response.statusText)
            }
            const postNew = await response.json()
            console.log('post.get', postNew)     
            dispatch(
                actions.load(postNew.blocks ?? [])
            )
            setPost(postNew)
        })()
    }, [])

    return <div>
        <article itemScope="itemscope" itemType="https://schema.org/Article">
            <Main title={post.title} image={post.image} onChange={handleChange} />
            <Editor blocks={{ state, dispatch, actions }} intro={post.description}
                onChangeIntro={intro => handleChange('description', intro)} />
        </article>
        <p className="text-center mt-5">
            <a className="btn btn-primary me-2" onClick={handleDownload}
                title="Зберегти публікацію">Зберегти</a>
            <a className="btn btn-danger" onClick={handleDelete}
                title="Видалити публікацію">Видалити</a>
        </p>
    </div>
}