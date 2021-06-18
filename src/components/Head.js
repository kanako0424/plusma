import React from "react";
import {Helmet} from "react-helmet";
 
export default function Head() {
  return (
      <div className="application">
          <Helmet>
              <meta charSet="utf-8" />
              <title>Plusma</title>
              <meta name="description" content="中古の教科書や参考書だけを投稿できるサイトです。大学受験や資格試験のための参考書が揃っています。" />
              
          </Helmet>
      </div>
  );
};
