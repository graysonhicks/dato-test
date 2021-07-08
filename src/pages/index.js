import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const IndexPage = ({ data }) =>
  console.log(data) || (
    <Layout>
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
