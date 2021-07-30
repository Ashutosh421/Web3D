#version 300 es

precision mediump float;

in vec3 vNormal;
in vec3 fragPos;

out vec4 finalColor;

uniform float u_time;
uniform vec3 u_lightDir;

struct Material {
    vec4 color;
    float ambience;
    float diffuse;
    float specular;
    float shininess;
};

struct DirectionalLight {
    vec3 color;
    vec3 direction;
    float intensity;
};
uniform DirectionalLight u_dLight;

struct SpotLight {
    vec3 color;
    vec3 position;
    vec3 intensity;
};
uniform SpotLight u_sLight;

float lightRange = 10.;
Material material = Material(vec4(1 , 0 , 0 , 1), 0.3 , 0.4, 0.2, 20.);

vec3 getAmbience(Material material) {
    return material.color.xyz * material.ambience;
}

vec3 getDiffuse(Material material, vec3 normal, vec3 light) {
    float diffuseCoeff = max(0., dot(normal, light));
    return material.color.xyz * material.diffuse * diffuseCoeff;
}

vec3 getSpecular(Material material, vec3 normal, vec3 light) {

    // Current Camera Post
    vec3 cameraPos = vec3(0 , 3 , -4);

    // Reflect the Light over the normal
    vec3 reflectedLight = reflect(light, normal);
    vec3 viewDir = normalize(cameraPos - fragPos);

    float specCoeff =  pow(max(dot(viewDir, reflectedLight), 0.), material.shininess);

    return material.color.xyz * material.specular * specCoeff;
}

void main() {
    float lightDistance = distance(u_sLight.position , fragPos);
    float lightAttenuation = (1.0 / lightDistance) * lightRange;
    vec3 lightDir = normalize(u_sLight.position - fragPos);


    vec3 ambience = getAmbience(material) * lightAttenuation;
    vec3 diffuse = getDiffuse(material, vNormal, lightDir) * lightAttenuation;
    vec3 specular = getSpecular(material, vNormal, lightDir) * lightAttenuation;
    
    vec3 compColor = ambience + diffuse + specular;
    finalColor = vec4(compColor, 1.);
}