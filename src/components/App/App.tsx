import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

import Search from '../Search/Search';
import ServiceOverview from '../ServiceOverview/ServiceOverview';
import Error from '../Error/Error';


const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'https://api.test.datacite.org/graphql',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div className="App d-flex flex-column vh-100">
        <header className="App-header">
          <Navbar>
            <LinkContainer to="/">
              <Navbar.Brand data-testid="navbar-brand"><span className="brand-highlight">PID</span> Services Registry</Navbar.Brand>
            </LinkContainer>
            <Nav className="mr-auto">
              <LinkContainer exact to="/">
                <Nav.Link>HOME</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/services">
                <Nav.Link>SERVICES</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar>
        </header>

        <div className="d-flex flex-column flex-grow-1">
        <main role="main" className="App-main h-100 flex-grow-1">
          <div className="container">
          <Switch>
              <Route exact path="/services">
                <Services />
              </Route>
              <Route path="/services/:serviceId+">
                <Service />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <Error title="Not found" message="The page you are looking for can not be found." />
              </Route>
          </Switch>
          </div>
        </main>

        <footer className="App-footer py-3">
          <Container>
            <Row>
              <Col sm={6}>
              <p>
                The PID Services Registry is maintained by <a href="https://www.datacite.org">DataCite</a> and was developed within the <a href="https://www.project-freya.eu">FREYA project</a> .
              </p>
              <p><img src="freya_logo.png" width="100" alt="FREYA" /></p>
              </Col>
              <Col sm={6}>
                  <p>The FREYA project has received funding from the <a href="https://ec.europa.eu/programmes/horizon2020/en">European Union’s Horizon 2020</a> research and innovation programme under grant agreement No 777523.</p>
              </Col>
            </Row>

          </Container>
          </footer>
          </div>
      </div>
    </Router>
    </ApolloProvider>
  );
}

function Home() {
  return (
    <div>
      <h2>PID Services Registry</h2>
      <Container className="content">
        <Row>
          <Col>
          <p>Welcome to the PID Services registry.</p>
          <p>
            This registry provides an overview of services related to Persistent Identifiers (PIDs). The PID Services Registry is maintained by DataCite and was developed within the FREYA project.
            For more information about the registry contact <a href="mailto:support@datacite.org">support@datacite.org</a>
          </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function Services() {
  return (
    <div>
    <h2>Services</h2>
    <Search></Search>
    </div>
  );
}

function Service() {
  let { serviceId } = useParams();

  return (
    <ServiceOverview serviceId={serviceId} />
  )
}

export default App;
