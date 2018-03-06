camera{
	location<0,0,-10>
	look_at<0,0,0>
}

background{ 
	color rgb <0.2, 0.2, 0.3>
}

light_source{
	<8,8,-8>
	color rgb 1
}

light_source{
	<4,4,-4>
	color rgb 1
}

sphere{
	<0,0,0>,
	2.5
	texture{pigment{color rgb<randRed, randGreen, randBlue>}}
	finish{
		#if(bAmbient)
			ambient fAmbient
		#end
		#if(bDiffuse)
			diffuse fDiffuse
		#end
		#if(bReflection)
			reflection fReflection
		#end
		#if(bSpecular)
			specular fSpecular
			#if(bRoughness)
				roughness fRoughness
			#end
		#end
	}
}

