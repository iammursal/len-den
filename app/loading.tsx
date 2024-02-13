import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
	return (
		<div className="w-screen h-[calc(100vh_-_100px)] flex  justify-center items-center">
			<Spinner />
		</div>
	)
}
