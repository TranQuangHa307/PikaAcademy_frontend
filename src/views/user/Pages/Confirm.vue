<template>
	<div>
		<component :is="comName">
	</div>
</template>

<script>
import Form1 from '../../../components/user/TeacherRegistration/Form1'
export default {
	data () {
		return {
			comName: 'Fomr1'
		}
	}
}
</script>