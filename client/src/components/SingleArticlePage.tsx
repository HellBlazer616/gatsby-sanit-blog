import React, { FC } from "react";
import styled from "@emotion/styled";
import { graphql, PageProps } from "gatsby";
import { Theme } from "../styles/color";

// type ArticleBody = [
//   children: { text: string }[]
// ];

interface Props extends PageProps {
  data: {
    article: {
      title: string;

      body: { children: Record<"text", string>[] }[];
    };
  };
}

const SingleArticlePage: FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <div className="article__title">
        <h1>{data.article.title}</h1>
      </div>
      <div className="article__wrapper">
        <main>
          {data.article.body.map((bodyContent, index) => (
            <p key={bodyContent.children[0].text} className="paragraph">
              {bodyContent.children[0].text}
            </p>
          ))}
        </main>
      </div>
    </Wrapper>
  );
};

// this needs to be dynamic based on the slug passed in via pageContext
export const query = graphql`
  query($slug: String!) {
    article: sanityPost(slug: { current: { eq: $slug } }, title: {}) {
      title
      body {
        children {
          text
        }
      }
    }
  }
`;

interface StyledProps {
  theme?: Theme;
}

const Wrapper = styled.div<StyledProps>`
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;

  & .article__title {
    margin-top: 64px;
    padding: 96px 32px 72px;
    text-align: center;
  }

  & .article__wrapper {
    padding: 0 32px;

    main {
      max-width: 675px;
      margin: auto;
    }
  }

  & .paragraph {
    font-size: 18px;
    margin-bottom: 1.5rem;
  }
`;
export default SingleArticlePage;
