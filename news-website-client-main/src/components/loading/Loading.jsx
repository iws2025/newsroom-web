import React from 'react'

const Loading = () => {
  return (
    <div class="container-fluid" style={{ height: "500px" }}>
        <div class="container d-flex align-items-center justify-content-center h-100">
            <div class="spinner-border" style={{ height: "60px", width: "60px" }} role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
  )
}

export default Loading