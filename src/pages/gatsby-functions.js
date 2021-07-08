import React from "react";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Form from "../components/form";

const About = ({ data: { about } }) =>
  console.log(about) || (
    <Layout>
      <article className="sheet">
        <HelmetDatoCms seo={about.seoMetaTags} />
        <div className="sheet__inner">
          <h1 className="sheet__title">Gatsby Functions</h1>
          <p className="sheet__lead">Serverless Functions Out of the Box</p>
          <div className="sheet__gallery">
            <StaticImage
              src="../images/functions.webp"
              alt="Gatsby Functions"
            />
          </div>
          <Form />
          <div
            className="sheet__body"
            dangerouslySetInnerHTML={{
              __html: about.bioNode.childMarkdownRemark.html,
            }}
          />
        </div>
      </article>
    </Layout>
  );

export default About;

export const query = graphql`
  query GatsbyFunctionsQuery {
    about: datoCmsAboutPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
