import { Container, Flex } from '@chakra-ui/layout'

import Header from './Header/Header'

const Layout = ({ children }) => {
  return (
    <Flex direction="column" h="100%">
      <Header />
      <Container maxW="container.md" h="100%" px={[2, 3, 4]}>
        {children}
      </Container>
    </Flex>
  )
}

export default Layout
