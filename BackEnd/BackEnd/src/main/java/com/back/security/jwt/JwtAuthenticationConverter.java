package com.back.security.jwt;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class JwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final JwtGrantedAuthoritiesConverter authoritiesConverter
            = new JwtGrantedAuthoritiesConverter();

    @Value("${jwt.attribute}")
    private String attribute;

    @Value("${keycloak.idResource}")
    private String idResource;

    @Override
    public AbstractAuthenticationToken convert(@NonNull Jwt source) {
        Collection<GrantedAuthority> authorities =
                Stream.concat(
                        authoritiesConverter.convert(source).stream(),
                                extractRoles(source).stream())
                        .toList();

        return new JwtAuthenticationToken(source, authorities, getName(source));
    }

    private String getName(Jwt source) {
        String name = JwtClaimNames.SUB;
        if (attribute != null) {
            name = attribute;
        }
        return source.getClaim(name);
    }

    private Collection<? extends GrantedAuthority> extractRoles(Jwt source) {

        Map<String, Object> resourceAccess = source.getClaim("resource_access");
        if (resourceAccess == null) {
            return Set.of();
        }
        Map<String, Object> resource = (Map<String, Object>) resourceAccess.get(idResource);
        if (resource == null) {
            return Set.of();
        }
        Collection<String> roles = (Collection<String>) resource.get("roles");
        if (roles == null) {
            return Set.of();
        }

        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toSet());
    }
}
