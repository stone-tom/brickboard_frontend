import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../elements/core/container/Layout/Layout';
import { ViewWrapper } from '../../styles/global.styles';
import { useStoreState } from '../../context/custom_store';
import getPendingPosts from '../../util/api/authentication/get-pending-posts';

function ConfirmationHint() {
  const { isAuthenticated } = useStoreState();
  const [pendingPosts, setPendingPosts] = useState(null);
  const router = useRouter();

  const loadPending = async()=>{
      let {content, error} = await getPendingPosts();
      console.log("GOT IT??",content);
      setPendingPosts(content);
  }
  useEffect(()=>{
    if(isAuthenticated){
     loadPending()
    }
  },[isAuthenticated])

  return (
    <Layout title="Bitte bestätige deine Email - Brickboard 2.0">
      <ViewWrapper>
          <h1>Hallo?</h1>
        {isAuthenticated &&
        <button onClick={()=> loadPending()} >Load that shit</button>
        }
      </ViewWrapper>
    </Layout>
  );
}

export default ConfirmationHint;
