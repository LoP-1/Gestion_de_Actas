package com.gestion_actas.gestion.de.actas.components;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey key;
    private final long expiration;

    public JwtUtil(
            @Value("${jwt.secret}") String secretBase64,
            @Value("${jwt.expiration:86400000}") long expiration
    ) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretBase64));
        this.expiration = expiration;
    }

    public String generateToken(String username, String rol) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .subject(username)
                .claim("rol", rol)
                .issuedAt(now)
                .expiration(exp)
                .signWith(key) // o .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return claims(token).getSubject();
    }

    public String extractRol(String token) {
        return claims(token).get("rol", String.class);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(stripBearer(token));
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    private Claims claims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(stripBearer(token))
                .getPayload();
    }

    private String stripBearer(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return token;
    }
}