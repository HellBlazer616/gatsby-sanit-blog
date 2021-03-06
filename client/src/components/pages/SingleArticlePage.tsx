import React, { FC } from 'react';
import tw, { styled } from 'twin.macro';
import { graphql, PageProps } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import { Theme } from '../../styles/color';
import SEO from '../SEO';
// type ArticleBody = [
//   children: { text: string }[]
// ];

interface Props extends PageProps {
  data: {
    article: {
      title: string;
      description: string;
      body: any;
    };
  };
}

// this needs to be dynamic based on the slug passed in via pageContext
export const query = graphql`
  query($slug: String!) {
    article: sanityPost(slug: { current: { eq: $slug } }, title: {}) {
      title
      description
      body: _rawBody(resolveReferences: { maxDepth: 10 })
    }
  }
`;

const SingleArticlePage: FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <SEO title={data.article.title} description={data.article.description} />
      <div className="article__title">
        <h1>{data.article.title}</h1>
      </div>
      <div className="article__wrapper">
        <main>
          {/* {data.article.body.map((bodyContent, index) => (
            <p key={bodyContent.children[0].text} className="paragraph">
              {bodyContent.children[0].text}
            </p>
          ))} */}
          <BlockContent blocks={data.article.body} className="body" />
        </main>
      </div>
    </Wrapper>
  );
};

interface StyledProps {
  theme?: Theme;
}

const Wrapper = styled.div<StyledProps>`
  ${tw`container mx-auto`}
  img {
    ${tw`mb-8`}
  }

  & .article__title {
    ${tw`mt-24 pt-32 pr-8 pb-20 pl-20 text-center`}
    h1 {
      ${tw`text-5xl`}
    }
  }

  & .article__wrapper {
    padding: 0 32px;

    main {
      max-width: 675px;
      margin: auto;
    }
  }

  & .body {
    p {
      font-size: 18px;
      margin-bottom: 1.5rem;
    }
  }
`;
export default SingleArticlePage;
