import * as React from "react"

export class Component extends React.Component {

  static async getInitialProps(args: any) {
    await this.botonicInit(args)
    return { context: args.req.context, params: args.params }
  }

  static async botonicInit(args: any) {

  }
}
