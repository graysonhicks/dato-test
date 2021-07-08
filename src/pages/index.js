import React from "react";
import { Link, graphql } from "gatsby";
import { StructuredText } from "react-datocms";

import Masonry from "react-masonry-component";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const IndexPage = ({ data }) => (
  <Layout>
    <StructuredText
      data={data.datoCmsHome.body}
      renderBlock={({ record }) => {
        if (record.__typename === "DatoCmsBlockTest") {
          return <h1>{record.blockTitle}</h1>;
        }
      }}
    />
    <Masonry className="showcase">
      {data.allDatoCmsWork.edges.map(({ node: work }) => (
        <div key={work.id} className="showcase__item">
          <figure className="card">
            <Link to={`/works/${work.slug}`} className="card__image">
              <GatsbyImage image={work.coverImage.gatsbyImageData} />
            </Link>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/works/${work.slug}`}>{work.title}</Link>
              </h6>
              <div className="card__description">
                <p>{work.excerpt}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    datoCmsHome {
      body {
        value
        blocks {
          __typename
          ... on DatoCmsBlockTest {
            id: originalId
            blockTitle
          }
        }
      }
    }
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            gatsbyImageData(width: 450)
          }
        }
      }
    }
  }
`;
