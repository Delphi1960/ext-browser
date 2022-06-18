import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from '~weather/app/App'
import Bootstrap from '~weather/app/Bootstrap'

function IndexPopup() {
  const [data, setData] = useState("");

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Bootstrap>
          <App />
        </Bootstrap>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default IndexPopup;
