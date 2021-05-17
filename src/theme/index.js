import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

/**
 * Config
 */
const config = {
  useSystemColorMode: false,
}

/**
 * Custom theme
 */
const theme = extendTheme({
  config,
  styles: {
    global: props => ({
      body: {
        bg: mode('gray.50', 'gray.900')(props),
      },
    }),
  },
})

export default theme
