import React from "react"
import Layout from "../components/layout"
import LeafletMap from "../components/leafletmap"
import { DatePicker } from "@material-ui/pickers";

const IndexPage = () => (
  <Layout>
    <section style={{ "margin": "0.5rem 1rem" }}>
      
    </section>

    {typeof window !== 'undefined' &&
        <LeafletMap
          position={[52,-0.5]}
          zoom={8}
          markerText={"Hello, this is a marker"}
        />
    }

  </Layout>
  )

  export default IndexPage
