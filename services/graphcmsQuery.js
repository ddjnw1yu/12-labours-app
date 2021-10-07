import { gql } from 'graphql-request';

async function content(graphcms, name) {
  const variables = {
    "name": name
  }

  const query = gql`
    query ($name: String!) {
      values: titledContent(where: {name: $name}) {
        content {
          html
        }
        title
      }
    }
  ` 

  return await graphcms.request(query, variables);
}


async function banner(graphcms, name) {
  const variables = {
    "name": name
  }
  const query = gql`
    query ($name: String!) {
      values: bannerImage(where: {name: $name}) {
        image {
          url
        }
        title
      }
    }
  `
  return await graphcms.request(query, variables);
}


async function topNews(graphcms, fetchCount) {
  const variables = {
    "fetchCount":  fetchCount  //fetchCount is nullable. In case fetchCount is not provided, all records will be returned
  }
  const query = gql`
    query ($fetchCount: Int) {
      newsList:  newsItems(
        orderBy: publishedDate_DESC
        first: $fetchCount
      ) 
      {
        publishedDate
        title
        image{
          url
        }
        category
        blurb
        slug
        detail{
          html
        }
      }
    }
  ` 
  return await graphcms.request(query, variables);
}

async function newsCategory(graphcms) {

  const query = gql`
    query introspectNewsCategoryType {
      __type(name: "NewsCategory") {
        enumValues {
          name
        }
      }
    }
  `
  return await graphcms.request(query);
}


async function topEvents(graphcms, fetchCount) {
  const variables = {
    "fetchCount": fetchCount,
  }
  const query = gql`
    query ($fetchCount: Int) {
      eventsList:  eventsItems(
        orderBy: startDate_DESC
        first: $fetchCount
      ) 
      {
        startDate
        endDate
        title
        image{
          url
        }
        category
        slug
        detail{
          html
        }
        blurb
        externalLink
      }
    }
  ` 
  return await graphcms.request(query, variables);
}

export default {
  content,
  banner,
  topNews,
  newsCategory,
  topEvents
  
}
