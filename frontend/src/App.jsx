import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
 
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}
  
//write or paste or edit code !`)

  const [ review, setReview ] = useState(``)
  const [btnclick,setbtnclick]=useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setbtnclick(true);
    setReview("Wait a moment.....")
    const response = await axios.post('https://code-reviewer-pjwj.onrender.com/ai/get-review', { code })
    setReview(response.data)
    setbtnclick(false)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">
              {!btnclick?"Review":"Reviewing"}
              
              
              </div>
        </div>
        <div className="right">
         {!review
         ?
         <div>
          Your Review will Appear Here ! 
         </div>
        

         
         :<Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>

         }
          
        </div>
      </main>
    </>
  )
}



export default App