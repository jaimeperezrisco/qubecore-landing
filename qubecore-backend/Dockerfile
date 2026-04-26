FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

RUN addgroup -S qubecore && adduser -S qubecore -G qubecore

COPY target/qubecore-backend-1.0.0.jar app.jar

RUN chown -R qubecore:qubecore /app

USER qubecore

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/services || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
