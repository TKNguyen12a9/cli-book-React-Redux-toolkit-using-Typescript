export interface BundleState {
	[key: string]:
		| {
				code: string
				loading: boolean
				err: string
		  }
		| undefined
}

export interface BundleComplete {
	cellId: string
	bundle: {
		code: string
		err: any
	}
}
