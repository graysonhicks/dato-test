import React from "react";
import Slider from "react-slick";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const WorkPage = ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsWork.title}</h1>
        <p className="sheet__lead">{data.datoCmsWork.excerpt}</p>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data.datoCmsWork.gallery.map(({ gatsbyImageData }) => (
              <GatsbyImage image={gatsbyImageData} />
            ))}
          </Slider>
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html,
          }}
        />
        <div className="sheet__gallery">
          <GatsbyImage image={data.datoCmsWork.gatsbyImageData} />
        </div>
      </div>
    </article>
  </Layout>
);

export default WorkPage;

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        gatsbyImageData(width: 200, height: 200)
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        gatsbyImageData(width: 600)
      }
    }
  }
`;
