import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions : {
            input : {
                main : resolve(__dirname,'index.html'),
                garden_flat : 'src/garden_flat.html',
                garden_xr : 'src/garden_xr.html'
            }
        }
    }
})